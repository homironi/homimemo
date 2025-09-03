const redirects: Record<string, string> = {
  "/categories/memo/0/": "/articles/qnhckrrtrx8xv662s0ox840y/",
  "/categories/memo/1/": "/articles/63wh6phn350glrerg3fq7u31/",
  "/categories/memo/2/": "/articles/myunaxoc7w88tb3shu04jo0k/",
  "/categories/developGame/0/": "/articles/y9gwahvcxi4fkbq52ws3a5q6/",
  "/categories/developGame/1/": "/articles/7fbf31ehamqsdas2g6gwyr7c/",
  "/categories/developGame/2/": "/articles/oxisarp8rwfqng1x7737y2pw/",
  "/categories/developGame/3/": "/articles/4m0x8paz57s6xzdv6llba90r/",
  "/categories/developOther/0/": "/articles/teuoslm5qrtzhh4lqkqlm34a/",
  "/categories/developOther/1/": "/articles/sdky27mklh0qz2c4nput34n1/",
  "/categories/developOther/2/": "/articles/t4qf2vp9yl42yilfihryxee7/",
  "/categories/developOther/3/": "/articles/6crtf6b55vez6cjwlkmcxmww/",
  "/categories/makeWeb/1/": "/articles/iaumv89u70tjyr7c7e0y0gyw/",
  "/categories/makeWeb/2/": "/articles/fdjs9rs2bn7ugq9rf8ysa28h/",
  "/categories/makeWeb/3/": "/articles/j9vw2byoxq9e0byuo0tgvnb3/",
  "/categories/makeWeb/4/": "/articles/9j7rt6wth5xco7mfweqbk4z5/",
  "/categories/makeWeb/5/": "/articles/2p1wt6y9byaq875c4kln2yra/",
  "/categories/makeWeb/6/": "/articles/gerhmam3hcmi9lbrgs3frm11/",
  "/categories/makeWeb/7/": "/articles/6itk153mtrh1rdtek0dacqg8/",
  "/categories/makeWeb/8/": "/articles/93n1rqxpt801pqg3cdozcl2s/",
};

const errorPages: Record<number, string> = {
  400: "/400.html",
  401: "/401.html",
  403: "/403.html",
  404: "/404.html",
  500: "/500.html",
  510: "/510.html",
};

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // リダイレクト判定
    if (redirects[url.pathname]) {
      const redirect = `${url.origin}${redirects[url.pathname]}`;
      return Response.redirect(redirect, 301);
    }

    // 静的ファイル返す（wrangler.jsoncのassetsのデータが返される）
    const response = await env.ASSETS.fetch(request);

    // エラーページ
    if (errorPages[response.status]) {
      const errorUrl = new URL(errorPages[response.status], url.origin);
      const errorResponse = await env.ASSETS.fetch(
        new Request(errorUrl.toString(), request)
      );

      return new Response(errorResponse.body, {
        status: response.status,
        headers: { "Content-Type": "text/html" },
      });
    }

    return response;
  },
};
