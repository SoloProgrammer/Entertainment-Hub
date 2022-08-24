
import '../Pagination/Pagination.css'

import Pagination from '@material-ui/lab/Pagination'

import {ThemeProvider} from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

function CustomPagination({ setPage, totalpages }) {

  return (
    <div className="pagination">
      <ThemeProvider theme={theme}>
        <Pagination onChange={(e) => { setPage(e.target.textContent) }} count={totalpages} color="primary" hideNextButton hidePrevButton />
      </ThemeProvider>
    </div>
  );
}
export default CustomPagination
