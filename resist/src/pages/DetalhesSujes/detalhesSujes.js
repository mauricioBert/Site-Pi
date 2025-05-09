import { useState, useEffect } from "react";
import BlockList from "@/components/BlockList";
import FooterContent from "@/components/FooterContent";
import HeaderBar from "@/components/HeaderBar";
import NavBar from "@/components/NavBar";
import axios from "axios";
import url from "@/services/url"; // Supondo que o url seja o serviço para a API
import { useRouter } from "next/router";
import Head from "next/head";
import ListSujestao from "@/components/ListaSujestao";
import styles from "./style.module.css";
import { Container } from "postcss";
import CardInfo from "@/components/card/card";

const DetalhesSujes = () => {
  const [urlInput, setUrlInput] = useState("");
  const [termoInput, setTermoInput] = useState("");
  const [periodoInput, setPeriodoInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Função para adicionar um novo bloqueio manual
  // const adicionarBloqueioManual = async () => {
  //   const token = localStorage.getItem("token"); // Pegue o token armazenado
  //   if (!urlInput) {
  //     alert("A URL é obrigatória!");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     const novoBloqueio = {
  //       url: urlInput,
  //       urlWeb: urlInput,
  //       motivo: termoInput || "Bloqueio Manual",
  //       periodo: periodoInput || "Indefinido",
  //       tipoInsercao: "Manual",
  //       ipMaquina: "192.168.1.1",
  //       dataHora: new Date().toISOString(),
  //       flag: true,
  //     };

  //     const token = localStorage.getItem("token");
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //     const response = await axios.post(`${url}/bloqueios`, novoBloqueio);

  //     if (response.data.success) {
  //       setUrlInput("");
  //       setTermoInput("");
  //       setPeriodoInput("");
  //       alert("Bloqueio adicionado com sucesso!");
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Erro ao adicionar o bloqueio:", error);
  //     alert(
  //       error.response?.data?.error ||
  //         "Erro ao adicionar o bloqueio. Por favor, tente novamente."
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      try {
        const response = await axios.get(`${url}/bloqueios`);
        // Processar a resposta
      } catch (error) {
        console.error("Erro ao buscar bloqueios:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const user = JSON.parse(localStorage.getItem("usuario"));
      setUsuario(user);
    }
    setIsMounted(true);
  }, [router]);

  // Mostrar uma tela de carregamento enquanto verifica o usuário
  if (!isMounted) {
    return <p>Carregando...</p>;
  }

  // Redirecionar se o usuário não estiver autenticado
  if (!usuario) {
    router.push("/login");
    return null; // Evita renderizar o restante do componente
  }

  return (
    <>
      <Head>
        <title>Detalhes</title>
      </Head>
      <section className="container-principal">
        <NavBar />
        <section className="main-container">
          {/* dashLeft-container */}
          <HeaderBar usuario={usuario} />
          <section className="dashLeft-container">
            <CardInfo
              titulo={"Detalhes"}
              subtitulo={
                "Aqui você encontra os detalhes específicos para cada solicitação."
              }
            />

            <section>
              <div></div>
              <div>
                <form className={styles.formulario}>
                  {/* Linha 1 */}
                  <div className={styles.linha}>
                    <label htmlFor="nome">URL da solicitação:</label>
                    <input type="text" id="nome" />
                  </div>

                  {/* Linha 2 */}
                  <div className={styles.linha}>
                    <label htmlFor="email">Data:</label>
                    <input type="email" id="email" />
                  </div>

                  {/* Linha 3 */}
                  <div className={styles.linha}>
                    <label htmlFor="telefone">Motivo informado:</label>
                    <input type="tel" id="telefone" />
                  </div>

                  {/* Linha 4 */}
                  <div className={styles.linha}>
                    <label htmlFor="mensagem">Tipo de solicitação:</label>
                    <input id="mensagem" rows="3" />
                  </div>

                  {/* Linha 5 - Visualização da imagem */}
                  <div className={styles.linha}>
                    <img
                      // src={fotoUrl}
                      alt="Foto do usuário"
                      className={styles.imagem}
                    />
                  </div>
                </form>
              </div>
            </section>
          </section>
        </section>
      </section>
      <FooterContent />
    </>
  );
};

export default DetalhesSujes;
