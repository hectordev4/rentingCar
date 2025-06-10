// UserRepository.java
package dev.renting.users;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    <T> void save(T item);

    List<Booking> findBookingsByUserId(String userId);

    Optional<User> findById(String userId);

}
