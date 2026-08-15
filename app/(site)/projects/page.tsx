import ProjectsClient from '@/components/ProjectsClient';

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / Projects</div>
          <h1>Our project portfolio</h1>
          <p>
            A sample of recent roofing projects across the region. Click any project to see the
            full before-and-after story.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <ProjectsClient />
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap section-pad reveal">
          <h2>Like what you see?</h2>
          <p>Your project could be the next one on this page.</p>
          <div className="ctas">
            <a className="btn btn-primary" href="/contact#estimate">
              Get My Free Estimate
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
