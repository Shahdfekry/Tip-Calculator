import { useState } from "react";
const tipValues = [5, 10, 15, 25, 50];

function App() {
  return (
    <div className="container">
      <Logo />
      <TipCalculator />
    </div>
  );
}
function Logo() {
  return (
    <div className="logo">
      <img src="/images/logo.svg" alt="Logo" />
    </div>
  );
}
function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState(null);
  const [customPercentage, setCustomPercentage] = useState(null);
  const [peopleNum, setPeopleNum] = useState("");
  const [peopleNumError, setPeopleNumError] = useState("");
  const tipAmount =
    Math.round((((tipPercentage / 100) * parseFloat(bill)) / peopleNum) * 100) /
    100;
  const billPerPerson = Math.round((parseFloat(bill) / peopleNum) * 100) / 100;

  function handleReset() {
    setBill("");
    setTipPercentage(null);
    setCustomPercentage(null);
    setPeopleNum("");
  }

  const handlePeopleNumChange = (e) => {
    const value = Number(e.target.value);
    if (/[^0-9]/.test(value)) {
      setPeopleNumError("Must be a number");
      setPeopleNum("");
    } else if (value === 0) {
      setPeopleNumError("Can't be zero");
      setPeopleNum(value);
    } else {
      setPeopleNumError("");
      setPeopleNum(value);
    }
  };

  return (
    <div className="tip-calculator">
      <BillInfo
        bill={bill}
        setBill={setBill}
        tipPercentage={tipPercentage}
        setTipPercentage={setTipPercentage}
        peopleNum={peopleNum}
        setPeopleNum={handlePeopleNumChange}
        peopleNumError={peopleNumError}
        customPercentage={customPercentage}
        setCustomPercentage={setCustomPercentage}
      />
      <SplitResult
        tipAmount={tipAmount}
        peopleNum={peopleNum}
        billPerPerson={billPerPerson}
        bill={bill}
        onHandleReset={handleReset}
      />
    </div>
  );
}
function BillInfo({
  bill,
  setBill,
  tipPercentage,
  setTipPercentage,
  peopleNum,
  setPeopleNum,
  peopleNumError,
  customPercentage,
  setCustomPercentage,
}) {
  return (
    <div className="bill-info">
      <div className="bill-input">
        <label className="darkGrayish-cyan">Bill</label>
        <span>
          <img src="/images/icon-dollar.svg" alt="money-icon" />
        </span>
        <input
          className="veryLight-cyan"
          type="text"
          placeholder="0"
          value={bill}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) {
              setBill(value);
            }
          }}
        />
      </div>
      <div className="tip">
        <label className="darkGrayish-cyan">Select Tip %</label>
        <div className="select-tip">
          {tipValues.map((tip) => (
            <Button
              key={tip}
              className={`tip-selection-btn ${
                tipPercentage === tip ? "btn-selected" : ""
              }`}
              onClick={() => {
                setTipPercentage(tip);
                setCustomPercentage(null);
              }}
            >
              {tip}%
            </Button>
          ))}

          <input
            className="veryLight-cyan"
            type="text"
            placeholder="Custom"
            value={customPercentage || ""}
            onChange={(e) => {
              const customValue = Number(e.target.value);
              setCustomPercentage(customValue);
              setTipPercentage(customValue);
            }}
          />
        </div>
      </div>

      <div className="people-num-input">
        <div className="label-error">
          <label className="darkGrayish-cyan">Number of People</label>
          {peopleNumError && <p className="error-message">{peopleNumError}</p>}
        </div>
        <span>
          <img src="/images/icon-person.svg" alt="person-icon" />
        </span>
        <input
          className={`veryLight-cyan ${peopleNumError ? "error" : ""}`}
          type="text"
          placeholder="0"
          value={peopleNum}
          onChange={setPeopleNum}
        />
      </div>
    </div>
  );
}
function SplitResult({
  tipAmount,
  peopleNum,
  billPerPerson,
  bill,
  onHandleReset,
}) {
  return (
    <div className="split-result">
      <div className="result-tip-amount">
        <span>
          <h3>Tip Amount</h3>
          <h5>/ person</h5>
        </span>
        <p>${peopleNum ? tipAmount : "0.00"}</p>
      </div>
      <div className="result-total">
        <span>
          <h3>Total</h3>
          <h5>/ person</h5>
        </span>

        <p>${peopleNum ? (billPerPerson + tipAmount).toFixed(2) : "0.00"}</p>
      </div>
      <Button
        className={`reset-btn ${bill ? "reset-btn-full" : "reset-btn-empty"}`}
        onClick={onHandleReset}
      >
        RESET
      </Button>
    </div>
  );
}

function Button({ children, className, onClick }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
