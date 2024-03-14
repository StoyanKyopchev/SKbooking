export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex border border-sky-800">
        {pageNumbers.map((number) => {
          return (
            <li
              key={number}
              className={`px-2 py-1 font-semibold ${
                page === number ? "bg-sky-800 text-white" : ""
              }`}
            >
              <button onClick={() => onPageChange(number)}>{number}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
