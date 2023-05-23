import { env } from "~/env.mjs"
import * as AWS from "aws-sdk"


AWS.config.update({
    accessKeyId: env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: env.NEXT_PUBLIC_REGION_NAME
});

export const s3_connection = new AWS.S3();

export function insertFile(bucketName: string, objectKey: string, objectBody: File){
    const parameters = {
        Bucket: bucketName,
        Key: objectKey,
        Body: objectBody
    };
    s3_connection.upload(parameters, function(err: any, data: any) {
        if (err) {
          throw new Error("Error uploading file: ", err);
        } else {
          console.log('File uploaded successfully at location:', data.Location);
        }
    });
}



export async function getFile(bucketName: string, objectKey: string): Promise<string>{
    const retrievalParameters = {
        Bucket: bucketName,
        Key: objectKey
    };
    try{
        const response = await s3_connection.getObject(retrievalParameters).promise();
        const responseContent: string = response.Body?.toString('utf-8') as string;
        //console.log("Res: ", response.Body?.toString('utf-8'))
        return responseContent;
    }catch(error){
        console.error("Error retrieving file: ", error);
        throw error;
    }

}