package com.backend.exam.dina.services;

import com.backend.exam.dina.models.TablaExamen;
import com.backend.exam.dina.repositories.TablaExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class TablaExamenService {

    private final TablaExamenRepository tablaExamenRepository;

    @Autowired
    public TablaExamenService(TablaExamenRepository tablaExamenRepository) {
        this.tablaExamenRepository = tablaExamenRepository;
    }

    public void insertarTablaExamen(TablaExamen tablaExamen) {
        tablaExamenRepository.save(tablaExamen);
    }
}