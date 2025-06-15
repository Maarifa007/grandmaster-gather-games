
/**
 * Calculate Global Speed Chess Rating (GSCR) change based on match result
 * @param current - Current player rating
 * @param result - Match result: "win", "draw", or "loss"
 * @param opponent - Opponent's rating
 * @returns New rating after the change
 */
export function calculateGSCR(
  current: number, 
  result: "win" | "draw" | "loss", 
  opponent: number
): number {
  const K = 24; // K-factor for rating volatility
  const expected = 1 / (1 + Math.pow(10, (opponent - current) / 400));
  const score = result === "win" ? 1 : result === "draw" ? 0.5 : 0;
  return Math.round(current + K * (score - expected));
}

/**
 * Calculate expected score against an opponent
 * @param playerRating - Player's current rating
 * @param opponentRating - Opponent's rating
 * @returns Expected score (0-1)
 */
export function calculateExpectedScore(playerRating: number, opponentRating: number): number {
  return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
}

/**
 * Calculate rating change for multiple games
 * @param currentRating - Player's starting rating
 * @param games - Array of game results with opponent ratings
 * @returns Final rating after all games
 */
export function calculateMultipleGames(
  currentRating: number,
  games: Array<{ result: "win" | "draw" | "loss"; opponentRating: number }>
): number {
  return games.reduce((rating, game) => {
    return calculateGSCR(rating, game.result, game.opponentRating);
  }, currentRating);
}
