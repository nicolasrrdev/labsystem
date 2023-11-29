package com.backend.exam.dina.services;
import com.backend.exam.dina.models.TablaExamen;
import com.backend.exam.dina.repositories.TablaExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;
import java.sql.Timestamp;
@Service
public class TablaExamenService {
    @Autowired
    private TablaExamenRepository tablaExamenRepository;
    public TablaExamen insertarRegistro(TablaExamen tablaExamen) {
        return tablaExamenRepository.save(tablaExamen);
    }
    public TablaExamen editarRegistro(Integer id, TablaExamen tablaExamen) {
        Optional<TablaExamen> optionalTablaExamen = tablaExamenRepository.findById(id);
        if (optionalTablaExamen.isPresent()) {
            TablaExamen registroExistente = optionalTablaExamen.get();
            registroExistente.setCampo1(tablaExamen.getCampo1());
            registroExistente.setCampo2(tablaExamen.getCampo2());
            registroExistente.setCampo3(tablaExamen.getCampo3());
            registroExistente.setTimestampColumn(new Timestamp(System.currentTimeMillis()));
            return tablaExamenRepository.save(registroExistente);
        } else {
            return null;
        }
    }
    public void eliminarRegistro(Integer id) {
        tablaExamenRepository.deleteById(id);
    }
    public List<TablaExamen> obtenerTodosLosRegistros() {
        return tablaExamenRepository.findAll();
    }
    public TablaExamen obtenerRegistroPorId(Integer id) {
        Optional<TablaExamen> optionalTablaExamen = tablaExamenRepository.findById(id);
        return optionalTablaExamen.orElse(null);
    }
    public List<TablaExamen> obtenerRegistrosPorPacienteId(Integer pacienteId) {
        return tablaExamenRepository.findByPacienteId(pacienteId);
    }
}
