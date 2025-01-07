const CaptainAcceptReject = ({ rides, setrides }) => {
  const data = rides[0];

  const onReject = () => {
    setrides((prev) => {
      const arr = prev.slice(1);
      return arr;
    });
  };

  const onAccept = ()=>{
    
  }

  if (!data) return null;

  return (
    <div className="fixed bottom-10 flex flex-col  items-center justify-center w-96 p-4 shadow-xl bg-white">
      <div className="flex w-full relative">
        <div className=" capitalize content-center size-14 text-xl text-center bg-slate-200 rounded-full">
          {data.user.fullname.firstname[0]}
        </div>
        <div className="flex flex-col ml-3 justify-center">
          <h6>{data.user.fullname.firstname}</h6>
          <h6>{data.user.fullname.lastname}</h6>
        </div>
        <div className="absolute right-0 z-10 bg-black rounded shadow text-white px-4 py-2">
          {data.fare}
        </div>
      </div>
      <div className="w-full h-[1.2px] bg-slate-800 my-4"></div>
      <div className="grid grid-cols-7 w-full">
        <div className="border-r-2 border-dotted border-black mr-5 "></div>
        <div className="col-span-6">
          <div className="flex relative">
            <h6 className=" capitalize">{data.origin}</h6>
            <div className="-left-7 rounded-full absolute top-2 h-3 border-2 border-black bg-white w-3"></div>
          </div>
          <div className="flex mt-3 relative">
            <h6 className=" capitalize">{data.destination}</h6>
            <div className="-left-7 rounded-full absolute top-2 h-3 bg-black w-3"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1.2px] bg-slate-800 my-4"></div>
      <div className="flex w-full gap-4">
        <button className="bg-black rounded text-white w-full p-4 font-semibold hover:scale-105 hover:bg-green-700 transition-all ease-in-out ">
          Confirm
        </button>
        <button
          onClick={onReject}
          className=" rounded border-black bg-white border-2  w-full p-4 font-semibold hover:bg-red-700 hover:text-white hover:border-red-700 hover:scale-105 transition-all ease-in-out"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CaptainAcceptReject;
