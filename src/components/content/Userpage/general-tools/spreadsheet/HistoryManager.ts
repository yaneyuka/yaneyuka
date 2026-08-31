/**
 * スプレッドシートのUndo/Redo履歴管理クラス
 * 操作履歴をスタックで管理し、Undo/Redo機能を提供します
 */

export interface HistorySnapshot {
  cells: Record<string, string>;
  formats: Record<string, any>;
  colWidths: number[];
  // 行・列の増減も Undo 対象にする（従来は cells だけ戻り、行数がズレていた）
  rows: number;
  cols: number;
}

export interface IAction {
  undo: () => void;
  redo: () => void;
}

class HistoryManager {
  private undoStack: HistorySnapshot[] = [];
  private redoStack: HistorySnapshot[] = [];
  private maxHistorySize: number = 50; // 履歴の最大保持数

  /**
   * 新しい操作を履歴に追加
   * @param snapshot 操作前の状態スナップショット
   */
  add(snapshot: HistorySnapshot) {
    this.undoStack.push(snapshot);
    // 新しい操作があればRedoスタックはクリア
    this.redoStack = [];
    
    // 履歴が最大数を超えたら古いものを削除
    if (this.undoStack.length > this.maxHistorySize) {
      this.undoStack.shift();
    }
  }

  /**
   * 元に戻す（Undo）
   *
   * Redo するには「戻す直前の状態」を退避しておく必要がある。
   * 以前は undo で取り出したスナップショット（＝操作前の状態）を
   * そのまま redoStack に積んでいたため、Redo しても同じ状態が
   * 再適用されるだけで何も起きなかった。
   *
   * @param current 現在の状態（Redo 用に退避される）
   * @returns 適用すべき「操作前」のスナップショット、またはnull
   */
  undo(current: HistorySnapshot): HistorySnapshot | null {
    const snapshot = this.undoStack.pop();
    if (!snapshot) return null;
    this.redoStack.push(current);
    return snapshot;
  }

  /**
   * やり直す（Redo）
   * @param current 現在の状態（Undo 用に退避される）
   * @returns 適用すべきスナップショット、またはnull
   */
  redo(current: HistorySnapshot): HistorySnapshot | null {
    const snapshot = this.redoStack.pop();
    if (!snapshot) return null;
    this.undoStack.push(current);
    return snapshot;
  }

  /**
   * 履歴をクリア（全削除時など）
   */
  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }

  /**
   * Undo可能かどうか
   */
  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  /**
   * Redo可能かどうか
   */
  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /**
   * 履歴の最大保持数を設定
   */
  setMaxHistorySize(size: number) {
    this.maxHistorySize = size;
    // 現在の履歴が最大数を超えている場合は削除
    while (this.undoStack.length > this.maxHistorySize) {
      this.undoStack.shift();
    }
  }
}

export default HistoryManager;

