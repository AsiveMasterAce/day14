import React from 'react';

const CycleLengthSelector = ({ value, onChange, className }) => {
  const handleChange = (event) => {
     onChange(event.target.value);
  };
 
 return (
    <div className="w-full">
      <select
        id="averageLengthOfCycles"
        name="cycleLength"
        value={value}
        onChange={handleChange}
        className={className}
      >
        <option value="22">22 days</option>
        <option value="23">23 days</option>
        <option value="24">24 days</option>
        <option value="25">25 days</option>
        <option value="26">26 days</option>
        <option value="27">27 days</option>
        <option value="28">28 days</option>
        <option value="29">29 days</option>
        <option value="30">30 days</option>
        <option value="31">31 days</option>
        <option value="32">32 days</option>
        <option value="33">33 days</option>
        <option value="34">34 days</option>
        <option value="35">35 days</option>
        <option value="36">36 days</option>
        <option value="37">37 days</option>
        <option value="38">38 days</option>
        <option value="39">39 days</option>
        <option value="40">40 days</option>
        <option value="41">41 days</option>
        <option value="42">42 days</option>
        <option value="43">43 days</option>
        <option value="44">44 days</option>
      </select>
    </div>
 );
};

export default CycleLengthSelector;
