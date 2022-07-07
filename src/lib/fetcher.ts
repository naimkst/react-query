import { getCookie } from "cookies-next";

export function graphqlFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  let formData: any;
  formData = null;
  let isFile = false; // initialized

  if (typeof FormData !== "undefined") {
    formData = new FormData();

    if (typeof variables === "object") {
      // @ts-ignore
      let counter = 0;

      for (const x in variables) {
        if (variables[x] instanceof File) {
          // @ts-ignore
          const index = `"${counter}"`;
          const map = `{${index}:["variables.${x}"]}`;
          const operation = JSON.stringify({
            query,
            variables,
            operationName: null,
          });

          formData.append("operations", operation);
          formData.append("map", map);
          formData.append(`${counter.toString()}`, variables[x]);

          isFile = true;

          counter++;
        }
      }
    }
  }

  return async (token: string | null): Promise<TData> => {
    const tokenData = token ? token : getCookie("token");
    let tokenObject = null;

    if (typeof tokenData === "string") {
      tokenObject = tokenData ? JSON.parse(tokenData) : null;
    }

    const accessToken =
      tokenObject !== null && tokenObject.hasOwnProperty("accessToken")
        ? tokenObject.accessToken
        : "";

    const header = isFile
      ? {
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
        }
      : {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + accessToken,
        };

    const res = await fetch("https://rickandmortyapi.com/graphql" as string, {
      method: "POST",
      // @ts-ignore
      headers: header,
      body: isFile ? formData : JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const error = json.errors[0];

      return error;
    }

    return json.data;
  };
}
