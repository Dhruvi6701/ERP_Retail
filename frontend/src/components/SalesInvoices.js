import React from 'react'

const SalesInvoices = (props) => {

    const [invoices, setInvoices] = useState([]);

    const fetchInvoices = async() => {
        let bodydata = {
            sd: props.dates.startdate,
            ed: props.dates.enddate,
          };
          let response = await fetch(url + "/invoicelist", {
            method: "POST",
            body: JSON.stringify(bodydata),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          let data = await response.json();
          setInvoices(data);
    }
  
    useEffect(() => {
      fetchInvoices();
    },[])
  
  return (
    <div>SalesInvoices</div>
  )
}

export default SalesInvoices