import './Loading.scss'
import loadingSvg from './../../img/loading.svg'

const Loading = (props) => {
  return (<div className='loading'>
    <img src={loadingSvg}  alt='Loading spinner'/>
  </div>)
}

export default Loading;