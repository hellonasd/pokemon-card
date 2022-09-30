import { NavLink } from "react-router-dom";
import "./pagination.scss";

interface IPagesProps {
  page: number;
  allpages: number;
  changePage: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Pagination = ({ page, changePage, allpages }: IPagesProps) => {
  function showPagination(allPagesCount: number, currentPage: number) {
    const array = new Array(allPagesCount).fill(0).map((_, i) => i + 1);
    const visible = 10;
    const delta = 5;

    if (currentPage >= array.length - delta + 1) {
      return (
        <>
          <NavLink to={`/pokemons/page/1`}>
            <button className="pagination__btn" onClick={changePage}>
              1
            </button>
          </NavLink>
          <span className="pagination__hide-btn">...</span>
          {array.slice(array.length - 9, currentPage + delta - 1).map((e) => {
            return (
              <NavLink key={e} to={`/pokemons/page/${e}`}>
                <button
                  className={
                    page === e ? "pagination__btn-active" : "pagination__btn"
                  }
                  onClick={changePage}
                  key={e}
                >
                  {e}
                </button>
              </NavLink>
            );
          })}
        </>
      );
    } else if (currentPage > Math.floor(visible / 2)) {
      return (
        <>
          <button className="pagination__btn" onClick={changePage}>
            1
          </button>
          <span className="pagination__hide-btn">...</span>
          {array
            .slice(currentPage - delta, currentPage + delta - 1)
            .map((e) => {
              return (
                <NavLink key={e} to={`/pokemons/page/${e}`}>
                  <button
                    className={
                      page === e ? "pagination__btn-active" : "pagination__btn"
                    }
                    onClick={changePage}
                    key={e}
                  >
                    {e}
                  </button>
                </NavLink>
              );
            })}
          <span className="pagination__hide-btn">...</span>
          <button className="pagination__btn" onClick={changePage}>
            {allpages}
          </button>
        </>
      );
    } else {
      return (
        <>
          {array.slice(0, visible).map((e) => {
            return (
              <NavLink key={e} to={`/pokemons/page/${e}`}>
                <button
                  className={
                    page === e ? "pagination__btn-active" : "pagination__btn"
                  }
                  onClick={changePage}
                  key={e}
                >
                  {e}
                </button>
              </NavLink>
            );
          })}
          <span className="pagination__hide-btn">...</span>
          <NavLink to={`/pokemons/page/${allpages}`}>
            <button className="pagination__btn" onClick={changePage}>
              {allpages}
            </button>
          </NavLink>
        </>
      );
    }
  }
  return <div className="pagination">{showPagination(allpages, page)}</div>;
};
