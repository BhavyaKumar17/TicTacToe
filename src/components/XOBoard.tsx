import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Player = "X" | "O";
type Result = Player | "Tie" | null;
type Board = (Player | null)[];
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (board: Board): Player | null => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const XOBoard = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [boardState, setBoardState] = useState<Board>(Array(9).fill(null));
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [winner, setWinner] = useState<Result>(null);

  const pressHandler = (i: number) => {
    if (boardState[i] || winner) return;

    const newBoard = [...boardState];
    newBoard[i] = currentPlayer;
    setBoardState(newBoard);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult);
      setCurrentPlayer(null);
    } else {
      const isBoardFull = newBoard.every((i) => i !== null);
      if (isBoardFull) {
        setCurrentPlayer(null);
        setWinner("Tie");
      } else setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  const startGame = (firstPlayer: Player) => {
    setBoardState(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(firstPlayer);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setBoardState(Array(9).fill(null));
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      <Text style={styles.subtitle}>A little strategy, a little fun.</Text>

      {!gameStarted && (
        <View style={styles.startCard}>
          <Text style={styles.sectionTitle}>Who goes first?</Text>
          <Text style={styles.helperText}>Choose your starting player</Text>

          <View style={styles.playerRow}>
            <TouchableOpacity
              style={[styles.playerButton, styles.xButton]}
              onPress={() => startGame("X")}
            >
              <Text style={styles.playerSymbol}>X</Text>
              <Text style={styles.playerLabel}>Player X</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.playerButton, styles.oButton]}
              onPress={() => startGame("O")}
            >
              <Text style={styles.playerSymbol}>O</Text>
              <Text style={styles.playerLabel}>Player O</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {gameStarted && (
        <View style={styles.gameCard}>
          {winner === null && currentPlayer !== null && (
            <View style={styles.turnBadge}>
              <Text style={styles.turnText}>{currentPlayer}'s turn</Text>
            </View>
          )}

          <View style={styles.boardContainer}>
            {boardState.map((cell, index) => (
              <Pressable
                key={index}
                style={[
                  styles.boardCell,
                  cell === "X" && styles.xCell,
                  cell === "O" && styles.oCell,
                ]}
                onPress={() => pressHandler(index)}
                disabled={cell !== null || winner !== null}
              >
                <Text
                  style={[
                    styles.cellText,
                    cell === "X" && styles.xText,
                    cell === "O" && styles.oText,
                  ]}
                >
                  {cell ?? "!"}
                </Text>
              </Pressable>
            ))}
          </View>

          {winner !== null && (
            <View style={styles.resultCard}>
              <Text style={styles.resultEmoji}>
                {winner === "Tie" ? "🤝" : "🎉"}
              </Text>

              <Text style={styles.resultTitle}>
                {winner === "Tie" ? "It's a tie!" : `${winner} wins!`}
              </Text>

              <Text style={styles.resultSubtitle}>
                {winner === "Tie" ? "Great game! Try again." : "Well played!"}
              </Text>

              <TouchableOpacity
                style={styles.restartButton}
                onPress={resetGame}
              >
                <Text style={styles.restartText}>Play Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#20264A",
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 15,
    color: "#7B819B",
    marginTop: 8,
    marginBottom: 32,
  },

  startCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#20264A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#20264A",
  },

  helperText: {
    fontSize: 14,
    color: "#8A90A8",
    marginTop: 8,
    marginBottom: 24,
  },

  playerRow: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },

  playerButton: {
    flex: 1,
    height: 120,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  xButton: {
    backgroundColor: "#E7EEFF",
  },

  oButton: {
    backgroundColor: "#FCE8F1",
  },

  playerSymbol: {
    fontSize: 38,
    fontWeight: "800",
  },

  playerLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8,
    color: "#555B73",
  },

  gameCard: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    elevation: 4,
    shadowColor: "#20264A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },

  turnBadge: {
    backgroundColor: "#EEF1FF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 24,
  },

  turnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#454FC4",
  },

  boardContainer: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  boardCell: {
    width: 94,
    height: 94,
    backgroundColor: "#F0F2F9",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  xCell: {
    backgroundColor: "#E7EEFF",
  },

  oCell: {
    backgroundColor: "#FCE8F1",
  },

  cellText: {
    fontSize: 42,
    fontWeight: "800",
  },

  xText: {
    color: "#4263EB",
  },

  oText: {
    color: "#D63384",
  },

  resultCard: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#F8F9FF",
    borderRadius: 18,
    padding: 20,
    marginTop: 24,
  },

  resultEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },

  resultTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#20264A",
  },

  resultSubtitle: {
    fontSize: 14,
    color: "#7B819B",
    marginTop: 8,
    marginBottom: 20,
  },

  restartButton: {
    backgroundColor: "#4F5FEA",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },

  restartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default XOBoard;
