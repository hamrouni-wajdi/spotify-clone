import './Loading.scss'
import loadingSvg from './../../img/loading.svg'

const Loading = () => {
  return (<div className='loading'>
    <img src={loadingSvg}  alt='Loading spinner'/>
  </div>)
}

export default Loading;