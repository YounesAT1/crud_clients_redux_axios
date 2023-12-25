const Error = (props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl text-red-600">{props.error}</h1>
    </div>
  );
};

export default Error;
