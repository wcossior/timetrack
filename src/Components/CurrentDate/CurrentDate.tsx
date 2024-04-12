import './CurrentDate.css';

const CurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString('en-US', options);

  return (
    <p className='date'>{date}</p>
  )
}

export default CurrentDate
