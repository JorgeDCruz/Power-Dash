export { default } from "next-auth/middleware";

//Aqui especificamos las rutas protegidas
export const config = { matcher: ["/", "/persons"] };
