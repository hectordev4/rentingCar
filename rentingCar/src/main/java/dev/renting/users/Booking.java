package dev.renting.users;
import dev.renting.delegations.Car;
import dev.renting.delegations.Delegation;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;


public class Booking extends UserTableItem {
    private String bookingId; // Partition Key
    private String userId; // Sort Key
    private String startDate;
    private String endDate;
    private String status;
    private Car car;
    private Delegation pickupDelegation;
    private Delegation returnDelegation;


    @DynamoDbAttribute("userId")
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    @DynamoDbAttribute("startDate")
    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    @DynamoDbAttribute("endDate")
    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }

    @DynamoDbAttribute("status")
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @DynamoDbAttribute("car")
    public Car getCar() { return car; }
    public void setCar(Car car) { this.car = car; }

    @DynamoDbAttribute("pickupDelegation")
    public Delegation getPickupDelegation() { return pickupDelegation; }
    public void setPickupDelegation(Delegation pickupDelegation) { this.pickupDelegation = pickupDelegation; }

    @DynamoDbAttribute("returnDelegation")
    public Delegation getReturnDelegation() { return returnDelegation; }
    public void setReturnDelegation(Delegation returnDelegation) { this.returnDelegation = returnDelegation; }



}
