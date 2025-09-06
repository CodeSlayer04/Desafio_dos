import React from "react";
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";

const Reservacion = ({ item, eliminarNombre }) => {
  const dialogoEliminar = (id) => {
    console.log("eliminando....", id);
    eliminarNombre(id);
  };

  return (
    <View style={styles.reservacion}>
      <View>
        <Text style={styles.label}>Nombre: </Text>
        <Text style={styles.texto}>{item.nombre}</Text>
      </View>
      <View>
        <Text style={styles.label}>Fecha: </Text>
        <Text style={styles.texto}>{item.fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora: </Text>
        <Text style={styles.texto}>{item.hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Cantidad de personas: </Text>
        <Text style={styles.texto}>{item.cantidad}</Text>
      </View>
      <View>
        <Text style={styles.label}>Area: </Text>
        <Text style={styles.texto}>{item.area}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.btnEliminar}
        >
          <Text style={styles.textoEliminar}> Eliminar × </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reservacion: {
    backgroundColor: "#FFF",
    borderBottomColor: "#e1e1e1",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  texto: {
    fontSize: 18,
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: "red",
    marginVertical: 10,
    borderRadius: 5,
  },
  textoEliminar: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Reservacion;
