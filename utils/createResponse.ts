const createResponse = (
  ctx: any,
  status: number,
  body?: Record<string, any> | undefined,
  errorMessage?: string
) => {
  const isSuccess = !errorMessage;

  ctx.response.type = "json";
  ctx.response.status = status;
  ctx.response.body = {
    success: isSuccess,
    message: errorMessage,
    body,
  };
};

export default createResponse;
