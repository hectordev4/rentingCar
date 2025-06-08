package dev.renting.delegations;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Endpoint
@AnonymousAllowed
public class DelegationEndpoint {

    private final DelegationRepository delegationRepository;

    @Autowired
    public DelegationEndpoint(DelegationRepository delegationRepository) {
        this.delegationRepository = delegationRepository;
    }

    // Save Delegation
    public void saveDelegation(Delegation delegation) {
        delegationRepository.save(delegation);
    }

    // Save Car
    public void saveCar(Car car) {
        delegationRepository.save(car);
    }

    // Get Delegation by keys
    public Delegation getDelegation(String delegationId, String operation) {
        return delegationRepository.get(delegationId, operation, Delegation.class);
    }

    // Get Car by keys
    public Car getCar(String id, String operation) {
        return delegationRepository.get(id, operation, Car.class);
    }

    // List Delegations by delegationId
    public List<Delegation> listDelegationsById(String delegationId) {
        return delegationRepository.listByPartitionKey(delegationId, Delegation.class);
    }

    // List Cars by id (partition key)
    public List<Car> listCarsById(String id) {
        return delegationRepository.listByPartitionKey(id, Car.class);
    }

    // List all cars for all delegations
    public List<Car> getAllCars() {
        return delegationRepository.listAllCars();
    }

    // List all delegations with operation = "profile"
    public List<Delegation> getAllProfileDelegations() {
        return delegationRepository.listAllDelegations();
    }

    // Get available cars by delegationId and date
    public List<Car> getAvailableCars(String delegationId, String date) {
        List<Car> cars = delegationRepository.listByPartitionKey(delegationId, Car.class);
        List<Car> availableCars = new ArrayList<>();
        for (Car car : cars) {
            String sortKey = String.format("car#%d#%s#calendar", car.getYear(), car.getNumberPlate());
            Calendar calendar = delegationRepository.get(delegationId, sortKey, Calendar.class);
            if (calendar != null && calendar.getDates() != null && Boolean.TRUE.equals(calendar.getDates().get(date))) {
                availableCars.add(car);
            }
        }
        return availableCars;
    }
}
