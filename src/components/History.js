export default function History({ history }) {
  return (
    <div className="history">
      {history.length === 0 ? (
        <p className="text--no-history">
          Any calculations you make will appear here.
        </p>
      ) : (
        history.map(result => <p>{result}</p>).reverse()
      )}
    </div>
  );
}
