package com.labsystem.services;

import com.labsystem.models.Paciente;
import com.labsystem.repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    @Autowired
    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public Paciente obtenerPacientePorId(Integer pacienteId) {
        return pacienteRepository.findById(pacienteId).orElse(null);
    }

}