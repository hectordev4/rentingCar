// UserEndpoint.java
package dev.renting.users;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class UserEndpoint {

    private final UserRepository userRepository;

    @Autowired
    public UserEndpoint(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void saveBooking(Booking booking) {
        userRepository.save(booking);
    }

    // Get all bookings for a user
    public List<Booking> getBookingsByUser(String userId) {
        return userRepository.findBookingsByUserId(userId);
    }

}
