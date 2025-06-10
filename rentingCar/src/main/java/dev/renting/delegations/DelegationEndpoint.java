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
    public List<Car> getAvailableCars(String delegationId, List<String> dates) {
        System.out.println("getAvailableCars called with delegationId: " + delegationId + ", dates: " + dates);

        List<Car> cars = delegationRepository.listByPartitionKey(delegationId, Car.class);
        System.out.println("Cars fetched from DB: " + cars);

        List<Car> availableCars = new ArrayList<>();
        for (Car car : cars) {
            System.out.println("Checking car: " + car);

            String sortKey = String.format("car#%d#%s#calendar", car.getYear(), car.getNumberPlate());
            Calendar calendar = delegationRepository.getCalendar(delegationId, sortKey);
            System.out.println("Calendar for car " + car.getNumberPlate() + ": " + (calendar != null ? calendar.getDates() : "null"));

            if (calendar != null && calendar.getDates() != null) {
                boolean allAvailable = true;
                for (String dateStr : dates) {
                    Boolean available = calendar.getDates().get(dateStr);
                    System.out.println("Date: " + dateStr + ", available: " + available);
                    if (!Boolean.TRUE.equals(available)) {
                        allAvailable = false;
                        break;
                    }
                }
                if (allAvailable) {
                    System.out.println("Car " + car.getNumberPlate() + " is available for all dates.");
                    availableCars.add(car);
                }
            }
        }
        System.out.println("Available cars to return: " + availableCars);
        return availableCars;
    }
}
