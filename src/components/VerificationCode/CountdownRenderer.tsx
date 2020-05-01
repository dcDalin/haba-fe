import React from 'react';

interface Props {
  hours: any;
  minutes: any;
  seconds: any;
  completed: any;
}
const CountdownRenderer: React.FC<Props> = (props: Props) => {
  const { hours, minutes, seconds, completed } = props;
  if (completed) {
    // Render a completed state
    return <h2>done</h2>;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

export default CountdownRenderer;
