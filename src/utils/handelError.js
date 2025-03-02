const handelError = (error) => {
  if (error.status === 500) {
    return "Có lỗi xảy ra rùi =))";
  }
  return error.response.data.message;
};
export default handelError;
