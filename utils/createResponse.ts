const isObjectEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

const createResponse = (
  ctx: any,
  status: number,
  body?: Record<string, any> | undefined,
  errorMessage?: string
) => {
  const isSuccess = !errorMessage;

  const responseBody = {
    success: isSuccess,
    message: errorMessage,
    body,
  };

  if (isObjectEmpty(responseBody.body)) {
    delete responseBody.body;
  }

  ctx.response.type = "json";
  ctx.response.status = status;
  ctx.response.body = responseBody;
};

export default createResponse;
