package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepo extends JpaRepository<Character, Long> {
}
