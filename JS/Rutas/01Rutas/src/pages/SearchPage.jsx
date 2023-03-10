import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search)
  console.log(`
    ${JSON.stringify(location)}
    ${JSON.stringify(query)}
  `);
  console.log({location});
  console.log({query});

  const executeQueryParamas = (data) => {
    console.log(data);
    navigate(`?dato=${data.toLowerCase().trim()}&&name=Rigo`)
  }


  return (
    <>
      <h3>SearchPage</h3>
      <button className="btn btn-primary" onClick={()=>executeQueryParamas("EXECUTEQUERYPARAMS-1")}>Query parameters</button>
    </>
  )
}
