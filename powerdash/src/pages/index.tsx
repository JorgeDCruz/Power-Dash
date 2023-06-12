// import { handleCSV } from "~/utils/functions";
import {
  FormEventHandler,
  useState,
  useEffect,
  useRef,
  type FC,
  type ChangeEvent,
  type SetStateAction,
  type Dispatch,
  type FormEvent,
} from "react";
import { GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import { api } from "~/utils/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Input, Button, GeneralLayout } from "~/components";
import { cn } from "~/lib/utils";
import { set } from "cypress/types/lodash";
import { setgroups } from "process";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { NextPageWithLayout } from "./page";
import { ReturnData } from "~/server/api/routers/graphRoute";

const xLabels: string[] = ["Java", "C++", "Javascript", "Rust"];

const yLabels: string[] = ["Go", "C", "TypeScript", "Ruby"];

interface CheckBoxProps {
  className?: string;
  value: string;
  label: string;
  type: "xChecks" | "yChecks";
  formSubmit: boolean;
}

const CheckBox: FC<CheckBoxProps> = ({
  className,
  value,
  label,
  type,
  formSubmit,
}): JSX.Element => {
  const [check, setCheck] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    reset();
  }, [formSubmit]);

  const reset = (): void => setCheck(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCheck((prev) => !prev);
  };

  return (
    <div className={"flex items-center space-x-2"}>
      <input
        ref={ref}
        className={cn([``, className])}
        value={check ? value : undefined}
        name={value}
        id={type === "xChecks" ? "xChecks" : "yChecks"}
        type="checkbox"
        onChange={handleChange}
        checked={check}
      />
      <label>{label}</label>
    </div>
  );
};

interface IOptions {
  responsive: boolean;
  plugins: {
    legend: {
      position: "top";
    };
    title: {
      display: boolean;
      text: string;
    };
  };
}

interface MyChartProps {
  data: GraphData;
  options: IOptions;
}

const MyChart: FC<MyChartProps> = ({ data, options }) => {
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

interface AxisSelect {
  x: string[];
  y: string[];
}

interface GraphBarData {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface GraphData {
  labels: string[];
  datasets: GraphBarData[];
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Certifications",
    },
  },
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  session && session.user.image === undefined && (session.user.image = null);

  return {
    props: {
      user: session?.user,
    },
  };
};

const Home2: NextPageWithLayout = (): JSX.Element => {
  const { data: session, status } = useSession();
  const [axisSelect, setAxisSelect] = useState<AxisSelect[]>([]);
  const [formSubmit, setFormSubmit] = useState<boolean>(false);

  const [graphs, setGraphs] = useState<GraphData[]>([]);
  const [graphIndex, setGraphIndex] = useState<number>(0);
  const [graphBarValues, setGraphBarValues] = useState<ReturnData>({});

  const mutation = api.CSV.CSV_Upload.useMutation();
  const graphMutation = api.gData.dataGraph.useMutation();
  const bucketName = "ibmcsv";

  useEffect(() => {
    const getGraphData = async (): Promise<void> => {
      setGraphBarValues(
        await graphMutation.mutateAsync({
          xAxis: "",
          yAxis: "",
          type: "",
          selects: xLabels.length * 2,
        })
      );

      const graphBarDataX: GraphBarData[] = [];
      const graphBarDataY: GraphBarData[] = [];

      axisSelect[graphIndex - 1]?.x.forEach((select, index) => {
        graphBarDataX.push({
          label: select,
          data: [graphBarValues[index]] as number[],
          backgroundColor: "rgba(235, 242, 249, 1)",
        });
      });
      axisSelect[graphIndex - 1]?.y.forEach((select, index) => {
        graphBarDataY.push({
          label: select,
          data: [graphBarValues[index + xLabels.length]] as number[],
          backgroundColor: "rgba(235, 242, 249, 1)",
        });
      });

      const graphBarDataFull: GraphBarData[] = [
        ...graphBarDataX,
        ...graphBarDataY,
      ];
      const currentGraph: GraphData = {
        labels: ["Certificados"],
        datasets: graphBarDataFull,
      };

      setGraphs((prev) => [...prev, currentGraph]);
    };
    getGraphData();
  }, [formSubmit]);

  const getAxisValues = (axis: "x" | "y", elements: Element[]): string[] => {
    if (axis === "x") {
      const xValues = elements.map((element) => {
        if (element.attributes.item(2)?.value === "xChecks") {
          return element.attributes.item(4)?.value;
        }
      });
      return xValues.filter(
        (current) => current !== undefined && current !== ""
      ) as string[];
    } else {
      const yValues = elements.map((element) => {
        if (element.attributes.item(2)?.value === "yChecks") {
          return element.attributes.item(4)?.value;
        }
      });
      return yValues.filter(
        (current) => current !== undefined && current !== ""
      ) as string[];
    }
  };

  const handleSubmit: FormEventHandler = async (
    e: FormEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    const inputValues: Element[] = Array.from(
      e.currentTarget.getElementsByTagName("input")
    );
    setFormSubmit((prev) => !prev);
    setGraphIndex((prev) => ++prev);
    setAxisSelect((prev) => {
      return [
        ...prev,
        {
          x: getAxisValues("x", inputValues),
          y: getAxisValues("y", inputValues),
        },
      ];
    });
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={"bg-gray-100 p-4"}>
          <div className={"flex items-center space-x-3"}>
            <div>
              {xLabels.map((label, index) => {
                return (
                  <CheckBox
                    key={index}
                    formSubmit={formSubmit}
                    label={label}
                    value={label.toLowerCase()}
                    type="xChecks"
                  />
                );
              })}
            </div>
            <div>
              {yLabels.map((label, index) => {
                return (
                  <CheckBox
                    key={index}
                    formSubmit={formSubmit}
                    label={label}
                    value={label.toLowerCase()}
                    type="yChecks"
                  />
                );
              })}
            </div>
          </div>
          <Button
            type="submit"
            variant={"default"}
            className={"mt-3 bg-gray-300"}
          >
            Crear Gráfica
          </Button>
        </div>

        {graphs.map((graph, index) => {
          if (index > 1) {
            return <MyChart key={index} data={graph} options={options} />;
          } else {
            return null;
          }
        })}
      </form>
    </div>
  );
};

Home2.getLayout = (page) => (
  <GeneralLayout userName={page.props.user.name}>{page}</GeneralLayout>
);

export default Home2;
