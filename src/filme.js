{filmeModal && (
  <div className="modal-overlay" onClick={() => setFilmeModal(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="btn-fechar" onClick={() => setFilmeModal(null)}>
        <CgClose />
      </button>
      
      <h2>{filmeModal.name}</h2>
      <p className="sinopse-completa">
        {filmeModal.summary
          ? filmeModal.summary.replace(/<[^>]*>?/gm, "")
          : "Sinopse não disponível."}
      </p>
    </div>
  </div>
)}