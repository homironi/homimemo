import { post } from "axios";

export async function handler(event) {
  const { code } = JSON.parse(event.body);

  try {
    const response = await post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  }
  catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Authentication failed" }),
    };
  }
}

export const config = { path: "/auth" };
