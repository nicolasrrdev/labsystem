package com.backend.exam.dina.repositories;

import com.backend.exam.dina.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
}