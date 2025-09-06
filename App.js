import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
} from "react-native";
import Reservacion from "./componentes/Reservacion";
import Formulario from "./componentes/Formulario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "./src/utils/colors";

const App = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [mostrarform, guardarMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerReservacionesStorage = async () => {
      try {
        const reservacionesStorage = await AsyncStorage.getItem(
          "reservaciones"
        );
        if (reservacionesStorage) {
          setReservaciones(JSON.parse(reservacionesStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerReservacionesStorage();
  }, []);

  const eliminarNombre = (id) => {
    const reservacionesFiltradas = reservaciones.filter((res) => res.id !== id);
    setReservaciones(reservacionesFiltradas);
    guardarReservacionesStorage(JSON.stringify(reservacionesFiltradas));
  };

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform);
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  const guardarReservacionesStorage = async (reservacionesJSON) => {
    try {
      await AsyncStorage.setItem("reservaciones", reservacionesJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Taquería Bendicion de Dios</Text>
      <View style={styles.imgContainer}>
        <Image style={styles.logo} source={require("./assets/logo.png")} />
      </View>
      <Text style={styles.titulo}>Administrador de Reservaciones</Text>
      <View>
        <TouchableHighlight
          onPress={mostrarFormulario}
          style={styles.btnMostrarForm}
        >
          <Text style={styles.textoMostrarForm}>
            {mostrarform
              ? "Cancelar Crear Reservacion"
              : "Crear Nueva Reservacion"}
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.contenido}>
        {mostrarform ? (
          <TouchableWithoutFeedback onPress={cerrarTeclado}>
            <View style={styles.contenido}>
              <Text style={styles.titulo}>Crear Nueva Reservacion</Text>
              <Formulario
                reservaciones={reservaciones}
                setReservaciones={setReservaciones}
                guardarMostrarForm={guardarMostrarForm}
                guardarReservacionesStorage={guardarReservacionesStorage}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <>
            <Text style={styles.titulo}>
              {reservaciones.length > 0
                ? "Administra tus reservaciones"
                : "No hay reservaciones, agrega una"}
            </Text>
            <FlatList
              style={styles.listado}
              data={reservaciones}
              renderItem={({ item }) => (
                <Reservacion item={item} eliminarNombre={eliminarNombre} />
              )}
              keyExtractor={(reservacion) => reservacion.id}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: Colors.PRIMARY_COLOR,
    flex: 1,
  },
  titulo: {
    color: "#FFF",
    marginTop: Platform.OS === "ios" ? 80 : 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  contenido: {
    flex: 1,
    marginHorizontal: "2.5%",
    marginBottom: 20,
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: Colors.BUTTON_COLOR,
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
