import ServiceComponents from '../components/Service';
import Button from '@material-ui/core/Button';
import AddService from '../components/AddService'

const Service = () => {
    return (
        <div>
            {/* <Button variant="contained">Thêm dịch vụ</Button> */}
            <AddService />
            <br/>
            <ServiceComponents />
        </div>
    );
};
 export default Service;
