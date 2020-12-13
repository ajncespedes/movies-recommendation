import React, {useState, useEffect} from 'react';
import BeautyStars from 'beauty-stars';

const ScoreStars = (props) => {
    const [starsColor, setStarsColor] = useState("#ffed76");
    const [score, setScore] = useState(props.meanScore);
    const [text, setText] = useState(`Mean score: ${props.meanScore}/10 from ${props.numberOfVotes} votes`);


    const onMouseEnter = () => {
        setScore(props.userScore);
        setStarsColor("#7aa7fb");
        setText(`Your score: ${props.userScore}/10`);
    }

    const onMouseLeave = () => {
        setScore(props.meanScore);
        setStarsColor("#ffed76");
        setText(`Mean score: ${props.meanScore}/10 from ${props.numberOfVotes} votes`);
    }

    useEffect(() => {
        setScore(props.meanScore);
        setText(`Mean score: ${props.meanScore}/10 from ${props.numberOfVotes} votes`);
    }, [props]);

    return (
        <div className="stars">
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <BeautyStars
                    maxStars={props.maxStars}
                    size={props.size}
                    gap={props.gap}
                    inactiveColor={props.inactiveColor}
                    activeColor={starsColor}
                    value={score}
                    onChange={props.onChange}
                />
            </div>
            <p>{text}</p>
        </div>
    );
};

export default ScoreStars;