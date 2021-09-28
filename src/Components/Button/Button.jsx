import { Button } from './Button.styled';

function LoadMoreButton({ onClick }) {
    return (
        <>
            <Button type="button" onClick={onClick}>Load More</Button>
        </>
    );
}

export default LoadMoreButton;