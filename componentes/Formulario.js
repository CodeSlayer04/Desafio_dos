import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";
import Colors from "../src/utils/colors";
import { Picker } from "@react-native-picker/picker";

const Formulario = ({
  reservaciones,
  setReservaciones,
  guardarMostrarForm,
  guardarReservacionesStorage,
}) => {
  const [nombre, guardarNombre] = useState("");
  const [cantidad, guardarCantidad] = useState("");
  const [fecha, guardarFecha] = useState("");
  const [hora, guardarHora] = useState("");
  const [area, guardarArea] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const confirmarFecha = (date) => {
    const opciones = { year: "numeric", month: "long", day: "2-digit" };
    guardarFecha(date.toLocaleDateString("es-ES", opciones));
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const confirmarHora = (horaDate) => {
    const opciones = { hour: "numeric", minute: "2-digit", hour12: false };
    guardarHora(horaDate.toLocaleString("es-ES", opciones));
    hideTimePicker();
  };

  const crearNuevaReservacion = () => {
    if (
      nombre.trim() === "" ||
      cantidad.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      area.trim() === ""
    ) {
      mostrarAlerta();
      return;
    }

    const reservacion = { nombre, cantidad, fecha, hora, area };
    reservacion.id = shortid();

    const reservacionesNuevo = [...reservaciones, reservacion];
    setReservaciones(reservacionesNuevo);

    guardarReservacionesStorage(JSON.stringify(reservacionesNuevo));
    guardarMostrarForm(false);

    guardarNombre("");
    guardarCantidad("");
    guardarFecha("");
    guardarHora("");
    guardarArea("");
  };

  const mostrarAlerta = () => {
    Alert.alert("Error", "Todos los campos son obligatorios", [{ text: "OK" }]);
  };

  return (
    <ScrollView style={styles.formulario}>
      <View>
        <Text style={styles.label}>Nombre: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => guardarNombre(texto)}
          value={nombre}
        />
      </View>
      <View>
        <Text style={styles.label}>Cantidad: </Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(texto) => guardarCantidad(texto)}
          value={cantidad}
        />
      </View>
      <View>
        <Text style={styles.label}>Fecha:</Text>
        <Button
          title="Seleccionar Fecha"
          onPress={showDatePicker}
          color={Colors.COMPLEMENTARY2_COLOR}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={confirmarFecha}
          onCancel={hideDatePicker}
          locale="es_ES"
          headerTextIOS="Elige la fecha"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
        />
        <Text>{fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora:</Text>
        <Button
          title="Seleccionar Hora"
          onPress={showTimePicker}
          color={Colors.COMPLEMENTARY2_COLOR}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={confirmarHora}
          onCancel={hideTimePicker}
          locale="es_ES"
          headerTextIOS="Elige una Hora"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
        />
        <Text>{hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Área:</Text>
        <Picker
          selectedValue={area}
          onValueChange={(itemValue) => guardarArea(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un área" value="" />
          <Picker.Item label="Fumadores" value="Fumadores" />
          <Picker.Item label="No Fumadores" value="No Fumadores" />
        </Picker>
      </View>
      <View>
        <TouchableHighlight
          onPress={crearNuevaReservacion}
          style={styles.btnSubmit}
        >
          <Text style={styles.textoSubmit}>Crear Nueva Reservacion</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    borderRadius: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderStyle: "solid",
  },

  btnSubmit: {
    padding: 10,
    backgroundColor: Colors.BUTTON_COLOR,
    marginVertical: 10,
    marginBottom: 30,
  },
  picker: {
    height: 50,
    marginTop: 10,
    borderColor: "#e1e1e1",
    borderWidth: 1,
  },
  textoSubmit: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Formulario;
