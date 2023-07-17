const HowItWork = ({ how }: { how: any }) => {
  return (
    <section className="how-works">
      <h2
        className="how-works__title"
        dangerouslySetInnerHTML={{ __html: how.title }}
      ></h2>
      <div className="how-works__list">
        {how.list?.map((c: any, i: number) => (
          <div className="how-works__item" key={i}>
            <div className="how-works__item-icon">
              <img src={c.src} alt={c.alt} />
            </div>
            <p
              className="how-works__item-text"
              dangerouslySetInnerHTML={{ __html: c.text }}
            ></p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
