import Loader from 'react-loader-spinner';
import { Wrapper } from './Loader.Styled';

function Spinner() {
    return (
    <Wrapper>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} timeout={3000}/>
    </Wrapper>
    );
}

export default Spinner;