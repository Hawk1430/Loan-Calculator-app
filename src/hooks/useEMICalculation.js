import { useState, useEffect } from 'react';

// Custom hook for EMI calculation
const useEMICalculation = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [emi, setEmi] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  // Calculate EMI and amortization schedule
  useEffect(() => {
    if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
      const calculateEMI = () => {
        // Convert annual interest rate to monthly and decimal form
        const monthlyInterestRate = interestRate / 12 / 100;
        // Total number of monthly payments
        const totalPayments = loanTerm * 12;
        
        // EMI formula: P × R × (1 + R)^N / ((1 + R)^N - 1)
        const emiValue = loanAmount * 
          monthlyInterestRate * 
          Math.pow(1 + monthlyInterestRate, totalPayments) / 
          (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
        
        setEmi(emiValue);
        
        // Generate amortization schedule
        let remainingBalance = loanAmount;
        const schedule = [];
        
        for (let month = 1; month <= totalPayments; month++) {
          const interestPayment = remainingBalance * monthlyInterestRate;
          const principalPayment = emiValue - interestPayment;
          remainingBalance -= principalPayment;
          
          schedule.push({
            month,
            emi: emiValue,
            principal: principalPayment,
            interest: interestPayment,
            remainingBalance: Math.max(0, remainingBalance), 
          });
        }
        
        setAmortizationSchedule(schedule);
      };
      
      calculateEMI();
    } else {
      setEmi(0);
      setAmortizationSchedule([]);
    }
  }, [loanAmount, interestRate, loanTerm]);

  return {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    emi,
    amortizationSchedule,
  };
};

export default useEMICalculation;