import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
    const { alerts, setAlert } = useContext(AlertContext);

    return (
        <>
            {alerts.length > 0 &&
                alerts.map(alert => (
                    <div className={`alert alert-${alert.type}`} key={alert.id}>
                        <i className='fas fa-info-circle' /> {alert.msg}
                    </div>
                ))}
        </>
    );
};

export default Alerts;
