package com.backend.exam.dina.services;

import com.backend.exam.dina.models.TablaExamen;
import com.backend.exam.dina.repositories.TablaExamenRepository;
import org.hibernate.Hibernate;
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

    public TablaExamen obtenerTablaExamenPorId(Integer id) {
        TablaExamen tablaExamen = tablaExamenRepository.findById(id).orElse(null);
        if (tablaExamen != null) {
            Hibernate.initialize(tablaExamen.getCampos());
        }
        return tablaExamen;
    }

    public void actualizarTablaExamen(TablaExamen tablaExamen) {
        tablaExamenRepository.save(tablaExamen);
    }

    public void eliminarTablaExamen(TablaExamen tablaExamen) {
        tablaExamenRepository.delete(tablaExamen);
    }

}