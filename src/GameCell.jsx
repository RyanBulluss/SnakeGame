

export default function ({index, value}) {
  return (
    <div
      key={index}
      className={
        index % 2 === 0
          ? "bg-green-500 flex justify-center items-center"
          : "bg-green-400 flex justify-center items-center"
      }
    >
      <div className={value === 1 ? "bg-blue-500 w-full h-full" : ""}></div>
    </div>
  );
}
