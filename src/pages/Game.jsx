import { useState, useEffect } from "react";
import Board from "../components/Board";
import WinnersBoard from "../components/WinnersBoard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebase.config";

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), coordinates: { row: null, col: null } }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [orden, setOrden] = useState("ascendente");
  const [winners, setWinners] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAuthUser(null);
        navigate("/login");
      } else {
        setAuthUser(user);
      }
    });
    return () => {
      listen();
    };
  }, [navigate]);

  const handleWinner = async (w) => {
    const winner = {
      name: w,
    };
    try {
      // setWinners([...winners, current_winner.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSortMoves() {
    if (orden === "ascendente") {
      setOrden("descendente");
    } else {
      setOrden("ascendente");
    }
  }

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    nextHistory.push(nextSquares);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = `Ir hacia la jugada # ${move} en la posición (${squares.coordinates.row},${squares.coordinates.col})`;
    } else {
      description = "Ir al inicio del juego";
    }

    let element = <button onClick={() => jumpTo(move)}>{description}</button>;
    if (move === currentMove) {
      element = <span>{"Estás en el movimiento # " + currentMove}</span>;
    }
    return <li key={move}>{element}</li>;
  });

  if (orden === "descendente") {
    moves.reverse();
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="game pt-5">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onWinner={handleWinner} />
        </div>
        <div className="game-info">
          <button onClick={handleSortMoves}>{orden === "ascendente" ? "Ordenar Descendentemente" : "Ordenar Ascendentemente"}</button>
          <ol>{moves}</ol>
        </div>
        <div className="game-info">
          <WinnersBoard winners={winners} />
        </div>
      </div>
    </>
  );
}
