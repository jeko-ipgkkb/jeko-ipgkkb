/* eslint-disable */
/* ============================================================
   JEKO — static landing page script
   Page data + interactions: nav, reveal, count-up,
   member filter/search, gallery modal, join form.
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- helpers ---------------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function img(src, alt, className) {
    var node = document.createElement('img');
    node.src = src;
    node.alt = alt || '';
    if (className) node.className = className;
    return node;
  }

  /* ---------------- data ---------------- */
  var glanceStats = [
    { value: 11, label: 'Faculty Advisors', suffix: '' },
    { value: 34, label: 'Active Members', suffix: '' },
    { value: 6, label: 'Core Committees', suffix: '' },
    { value: 0, label: 'Possibilities', suffix: '\u221E' }
  ];

  var advisors = [
    {
      name: 'Dr. Nurul Aisyah binti Rahman',
      role: 'Head of Sports Science Department',
      description: 'Leads the academic direction of sports science and mentors JEKO\u2019s research-driven programmes.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20confident%20young%20Malaysian%20male%20university%20lecturer%20in%20a%20deep%20navy%20blazer%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20key%20light%2C%20professional%20academic%20headshot%2C%20calm%20natural%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-01&orientation=portrait'
    },
    {
      name: 'Prof. Madya Dr. Ahmad Fauzi bin Ismail',
      role: 'Senior Faculty Advisor',
      description: 'The long-standing guardian of JEKO, guiding leadership transitions and club governance.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20poised%20young%20Malaysian%20woman%20lecturer%20wearing%20a%20neat%20hijab%20and%20navy%20blazer%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20lighting%2C%20professional%20academic%20headshot%2C%20gentle%20confident%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-02&orientation=portrait'
    },
    {
      name: 'Dr. Siti Khadijah binti Hassan',
      role: 'Physical Education Coordinator',
      description: 'Shapes the pedagogy of physical education and aligns it with national curriculum standards.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20friendly%20young%20Malaysian%20woman%20lecturer%20with%20a%20ponytail%20in%20smart%20navy%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20light%2C%20professional%20academic%20headshot%2C%20warm%20approachable%20smile%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-03&orientation=portrait'
    },
    {
      name: 'Mr. Mohd Hafiz bin Abdullah',
      role: 'Sports Development Officer',
      description: 'Coordinates athlete development pathways and inter-campus sports competitions.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20young%20Malaysian%20man%20with%20glasses%20in%20a%20crisp%20light%20shirt%20on%20a%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20academic%20headshot%2C%20thoughtful%20calm%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-04&orientation=portrait'
    },
    {
      name: 'Dr. Rosnah binti Yaakob',
      role: 'Co-curricular Advisor',
      description: 'Oversees co-curricular frameworks and ensures every member develops beyond the field.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20warm%20young%20Malaysian%20woman%20wearing%20an%20elegant%20hijab%20and%20navy%20blazer%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20academic%20headshot%2C%20bright%20friendly%20smile%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-05&orientation=portrait'
    },
    {
      name: 'Mr. Wan Azlan bin Wan Daud',
      role: 'Athletics Advisor',
      description: 'Trains and prepares JEKO athletes for track and field events at state and national level.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20strong%20young%20Malaysian%20male%20athletics%20coach%20in%20a%20navy%20polo%20with%20arms%20lightly%20crossed%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20sports%20headshot%2C%20confident%20expression%2C%20sharp%20detail%2C%20premium%20athletic%20photography&width=800&height=1000&seq=jeko-port-06&orientation=portrait'
    },
    {
      name: 'Dr. Zainab binti Omar',
      role: 'Student Welfare Advisor',
      description: 'Champions member wellbeing, safety and a supportive club culture for all.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20composed%20young%20Malaysian%20woman%20lecturer%20with%20short%20neat%20hair%20in%20navy%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20light%2C%20professional%20academic%20headshot%2C%20calm%20reassuring%20smile%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-07&orientation=portrait'
    },
    {
      name: 'Mr. Khairul Anuar bin Zulkifli',
      role: 'Facilities & Safety Advisor',
      description: 'Manages sports facilities, equipment and risk management for every activity.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20an%20approachable%20young%20Malaysian%20man%20in%20a%20navy%20shirt%20on%20a%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20lighting%2C%20professional%20institutional%20headshot%2C%20warm%20genuine%20smile%2C%20sharp%20detail%2C%20premium%20photography&width=800&height=1000&seq=jeko-port-08&orientation=portrait'
    },
    {
      name: 'Dr. Faridah binti Salleh',
      role: 'Health & Wellness Advisor',
      description: 'Integrates health, nutrition and wellness education into JEKO\u2019s programme design.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20professional%20young%20Malaysian%20woman%20wearing%20glasses%20and%20a%20hijab%20in%20navy%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20academic%20headshot%2C%20focused%20gentle%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-09&orientation=portrait'
    },
    {
      name: 'Mrs. Noorhayati binti Mokhtar',
      role: 'Events Coordinator Advisor',
      description: 'Guides the planning and delivery of JEKO tournaments, carnivals and ceremonies.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20lively%20young%20Malaysian%20woman%20in%20smart%20casual%20navy%20clothing%20with%20a%20hijab%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20institutional%20headshot%2C%20cheerful%20expression%2C%20sharp%20detail%2C%20premium%20photography&width=800&height=1000&seq=jeko-port-10&orientation=portrait'
    },
    {
      name: 'Mr. Shamsul Bahri bin Rahim',
      role: 'Community Engagement Advisor',
      description: 'Connects JEKO to schools and communities through sports outreach and service.',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20confident%20young%20Malaysian%20man%20with%20a%20short%20beard%20in%20a%20navy%20blazer%20on%20a%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20academic%20headshot%2C%20warm%20assured%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-11&orientation=portrait'
    }
  ];

  var orgChart = {
    chairperson: {
      name: 'Wrex',
      role: 'Chairperson',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20confident%20young%20Malaysian%20male%20student%20leader%20in%20a%20navy%20sports%20blazer%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20leadership%20headshot%2C%20composed%20expression%2C%20sharp%20detail%2C%20premium%20sports%20organization%20photography&width=800&height=1000&seq=jeko-port-12&orientation=portrait'
    },
    viceChairperson: {
      name: 'Ella',
      role: 'Vice-Chairperson',
      image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20poised%20young%20Malaysian%20woman%20student%20leader%20wearing%20a%20sporty%20hijab%20and%20navy%20outfit%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20leadership%20headshot%2C%20confident%20friendly%20expression%2C%20sharp%20detail%2C%20premium%20photography&width=800&height=1000&seq=jeko-port-13&orientation=portrait'
    },
    administration: [
      { name: 'Sofea', role: 'Secretary', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20smart%20young%20Malaysian%20woman%20student%20in%20a%20navy%20blouse%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20team%20headshot%2C%20calm%20attentive%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-14&orientation=portrait' },
      { name: 'Farahiya', role: 'Vice-Secretary', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20warm%20young%20Malaysian%20woman%20with%20a%20hijab%20in%20navy%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20team%20headshot%2C%20bright%20smile%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-15&orientation=portrait' },
      { name: 'Puteri', role: 'Treasurer', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20composed%20young%20Malaysian%20woman%20student%20with%20neat%20hair%20in%20a%20navy%20blazer%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20team%20headshot%2C%20confident%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-16&orientation=portrait' },
      { name: 'Shah Ikmal', role: 'Vice-Treasurer', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20focused%20young%20Malaysian%20man%20student%20in%20a%20navy%20polo%20shirt%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20team%20headshot%2C%20steady%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-01&orientation=portrait' }
    ],
    committees: [
      { name: 'Multimedia', members: [
        { name: 'Mael', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20creative%20young%20Malaysian%20man%20student%20in%20a%20navy%20tee%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20committee%20headshot%2C%20easy%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-02&orientation=portrait' },
        { name: 'Alya', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20bright%20young%20Malaysian%20woman%20student%20with%20a%20hijab%20in%20navy%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20committee%20headshot%2C%20cheerful%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-03&orientation=portrait' }
      ] },
      { name: 'Programs & Activities', members: [
        { name: 'Nazmi', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20an%20energetic%20young%20Malaysian%20man%20student%20in%20a%20navy%20sports%20shirt%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20committee%20headshot%2C%20confident%20smile%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-04&orientation=portrait' },
        { name: 'Aliff', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20relaxed%20young%20Malaysian%20man%20student%20with%20glasses%20in%20a%20navy%20shirt%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20committee%20headshot%2C%20friendly%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-05&orientation=portrait' }
      ] },
      { name: 'Logistics', members: [
        { name: 'Shah Al Asri', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20dependable%20young%20Malaysian%20man%20student%20in%20a%20navy%20polo%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20committee%20headshot%2C%20steady%20confident%20look%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-06&orientation=portrait' },
        { name: 'Rayyan', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20young%20Malaysian%20man%20student%20with%20short%20hair%20in%20navy%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20committee%20headshot%2C%20calm%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-07&orientation=portrait' }
      ] },
      { name: 'Welfare', members: [
        { name: 'Trisya', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20caring%20young%20Malaysian%20woman%20student%20in%20a%20navy%20blouse%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20committee%20headshot%2C%20warm%20smile%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-08&orientation=portrait' },
        { name: 'Ainsyu', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20gentle%20young%20Malaysian%20woman%20student%20with%20a%20hijab%20in%20navy%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20committee%20headshot%2C%20kind%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-09&orientation=portrait' }
      ] },
      { name: 'Special Tasks', members: [
        { name: 'Akif', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20sharp%20young%20Malaysian%20man%20student%20in%20a%20navy%20shirt%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20committee%20headshot%2C%20focused%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-10&orientation=portrait' },
        { name: 'Syahirah', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20confident%20young%20Malaysian%20woman%20student%20with%20a%20hijab%20in%20navy%20blazer%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20committee%20headshot%2C%20poised%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-11&orientation=portrait' }
      ] },
      { name: 'Discipline', members: [
        { name: 'Fawwaz', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20serious%20young%20Malaysian%20man%20student%20in%20a%20navy%20polo%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20professional%20committee%20headshot%2C%20firm%20expression%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-12&orientation=portrait' },
        { name: 'Mia', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20an%20assured%20young%20Malaysian%20woman%20student%20in%20navy%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20professional%20committee%20headshot%2C%20calm%20confident%20look%2C%20sharp%20detail%2C%20premium%20institutional%20photography&width=800&height=1000&seq=jeko-port-13&orientation=portrait' }
      ] }
    ]
  };

  var members = [
    { no: '01', name: 'Aiman Hakimi', category: 'Athletics', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20confident%20young%20Malaysian%20male%20student%20athlete%20in%20a%20navy%20sports%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20natural%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-01&orientation=portrait' },
    { no: '02', name: 'Nur Balqis', category: 'Netball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20focused%20young%20Malaysian%20woman%20student%20athlete%20with%20a%20hijab%20in%20a%20navy%20sports%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20calm%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-02&orientation=portrait' },
    { no: '03', name: 'Danial Rizqi', category: 'Football', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20cheerful%20young%20Malaysian%20man%20student%20athlete%20in%20a%20navy%20polo%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20friendly%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-03&orientation=portrait' },
    { no: '04', name: 'Siti Aminah', category: 'Volleyball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20determined%20young%20Malaysian%20woman%20student%20athlete%20in%20a%20navy%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20confident%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-04&orientation=portrait' },
    { no: '05', name: 'Haziq Rahman', category: 'Athletics', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20an%20energetic%20young%20Malaysian%20man%20student%20athlete%20with%20a%20short%20beard%20in%20navy%20sportswear%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-05&orientation=portrait' },
    { no: '06', name: 'Nadia Izzati', category: 'Badminton', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20lively%20young%20Malaysian%20woman%20student%20athlete%20with%20a%20hijab%20in%20navy%20sports%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20bright%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-06&orientation=portrait' },
    { no: '07', name: 'Firdaus Amin', category: 'Football', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20focused%20young%20Malaysian%20man%20student%20athlete%20in%20a%20navy%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20serious%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-07&orientation=portrait' },
    { no: '08', name: 'Amirah Solehah', category: 'Netball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20warm%20young%20Malaysian%20woman%20student%20athlete%20in%20a%20navy%20polo%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20gentle%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-08&orientation=portrait' },
    { no: '09', name: 'Zulhilmi', category: 'Sepak Takraw', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20an%20agile%20young%20Malaysian%20man%20student%20athlete%20in%20navy%20sportswear%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20alert%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-09&orientation=portrait' },
    { no: '10', name: 'Hannah Yusof', category: 'Athletics', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20strong%20young%20Malaysian%20woman%20student%20athlete%20with%20a%20hijab%20in%20navy%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20determined%20look%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-10&orientation=portrait' },
    { no: '11', name: 'Irfan Danial', category: 'Basketball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20tall%20young%20Malaysian%20man%20student%20athlete%20in%20a%20navy%20basketball%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20confident%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-11&orientation=portrait' },
    { no: '12', name: 'Farah Nabila', category: 'Volleyball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20cheerful%20young%20Malaysian%20woman%20student%20athlete%20in%20navy%20sports%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20bright%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-12&orientation=portrait' },
    { no: '13', name: 'Syafiq Aiman', category: 'Hockey', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20solid%20young%20Malaysian%20man%20student%20athlete%20in%20a%20navy%20hockey%20kit%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20calm%20look%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-13&orientation=portrait' },
    { no: '14', name: 'Aisyah Zulaikha', category: 'Badminton', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20bright%20young%20Malaysian%20woman%20student%20athlete%20with%20a%20hijab%20in%20navy%20shirt%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20warm%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-14&orientation=portrait' },
    { no: '15', name: 'Luqman Hakim', category: 'Athletics', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20lean%20young%20Malaysian%20man%20student%20athlete%20in%20navy%20running%20gear%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20focused%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-15&orientation=portrait' },
    { no: '16', name: 'Wan Nur Aina', category: 'Netball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20spirited%20young%20Malaysian%20woman%20student%20athlete%20in%20a%20navy%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20confident%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-16&orientation=portrait' },
    { no: '17', name: 'Ariff Iskandar', category: 'Football', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20rugged%20young%20Malaysian%20man%20student%20athlete%20in%20navy%20sportswear%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20determined%20look%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-01&orientation=portrait' },
    { no: '18', name: 'Suhaila Mokhtar', category: 'Volleyball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20an%20elegant%20young%20Malaysian%20woman%20student%20athlete%20with%20a%20hijab%20in%20navy%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20calm%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-02&orientation=portrait' },
    { no: '19', name: 'Naufal Rahim', category: 'Basketball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20dynamic%20young%20Malaysian%20man%20student%20athlete%20in%20a%20navy%20basketball%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20energetic%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-03&orientation=portrait' },
    { no: '20', name: 'Nurul Iman', category: 'Athletics', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20focused%20young%20Malaysian%20woman%20student%20athlete%20in%20navy%20running%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20determined%20look%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-04&orientation=portrait' },
    { no: '21', name: 'Kamil Zulkifli', category: 'Sepak Takraw', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20coordinated%20young%20Malaysian%20man%20student%20athlete%20in%20navy%20sportswear%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20calm%20confidence%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-05&orientation=portrait' },
    { no: '22', name: 'Athirah Saad', category: 'Netball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20cheerful%20young%20Malaysian%20woman%20student%20athlete%20with%20a%20hijab%20in%20navy%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20bright%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-06&orientation=portrait' },
    { no: '23', name: 'Hakimi Osman', category: 'Hockey', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20sturdy%20young%20Malaysian%20man%20student%20athlete%20in%20navy%20hockey%20kit%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20steady%20look%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-07&orientation=portrait' },
    { no: '24', name: 'Nurellya Zainal', category: 'Badminton', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20graceful%20young%20Malaysian%20woman%20student%20athlete%20in%20navy%20sports%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20warm%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-08&orientation=portrait' },
    { no: '25', name: 'Danish Faris', category: 'Football', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20quick%20young%20Malaysian%20man%20student%20athlete%20in%20a%20navy%20football%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20focused%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-09&orientation=portrait' },
    { no: '26', name: 'Syazwani Ali', category: 'Volleyball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20an%20athletic%20young%20Malaysian%20woman%20student%20athlete%20with%20a%20hijab%20in%20navy%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20confident%20look%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-10&orientation=portrait' },
    { no: '27', name: 'Ridhwan Salleh', category: 'Athletics', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20driven%20young%20Malaysian%20man%20student%20athlete%20in%20navy%20track%20gear%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20intense%20focus%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-11&orientation=portrait' },
    { no: '28', name: 'Amalina Rashid', category: 'Netball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20friendly%20young%20Malaysian%20woman%20student%20athlete%20in%20a%20navy%20polo%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20gentle%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-12&orientation=portrait' },
    { no: '29', name: 'Faiz Umar', category: 'Basketball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20lively%20young%20Malaysian%20man%20student%20athlete%20in%20navy%20basketball%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20energetic%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-13&orientation=portrait' },
    { no: '30', name: 'Nurin Batrisyia', category: 'Badminton', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20sprightly%20young%20Malaysian%20woman%20student%20athlete%20with%20a%20hijab%20in%20navy%20sports%20shirt%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20bright%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-14&orientation=portrait' },
    { no: '31', name: 'Irfan Hakim', category: 'Sepak Takraw', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20an%20acrobatic%20young%20Malaysian%20man%20student%20athlete%20in%20navy%20sportswear%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20calm%20confidence%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-15&orientation=portrait' },
    { no: '32', name: 'Dayang Sofea', category: 'Athletics', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20strong%20young%20Malaysian%20woman%20student%20athlete%20in%20navy%20running%20attire%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20determined%20look%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-16&orientation=portrait' },
    { no: '33', name: 'Zharif Naim', category: 'Football', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20confident%20young%20Malaysian%20man%20student%20athlete%20in%20a%20navy%20football%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20directional%20light%2C%20team%20roster%20headshot%2C%20focused%20expression%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-01&orientation=portrait' },
    { no: '34', name: 'Hani Zafirah', category: 'Volleyball', image: 'https://readdy.ai/api/search-image?query=Editorial%20studio%20portrait%20of%20a%20warm%20young%20Malaysian%20woman%20student%20athlete%20with%20a%20hijab%20in%20navy%20jersey%2C%20warm%20off-white%20seamless%20backdrop%2C%20soft%20studio%20lighting%2C%20team%20roster%20headshot%2C%20kind%20smile%2C%20sharp%20detail%2C%20premium%20sports%20photography&width=800&height=1000&seq=jeko-port-02&orientation=portrait' }
  ];

  var memberCategories = ['All', 'Athletics', 'Netball', 'Football', 'Volleyball', 'Badminton', 'Basketball', 'Hockey', 'Sepak Takraw'];

  var galleryAlbums = [
    {
      index: '01',
      title: 'CLASS MOMENTS',
      description: 'Lectures, workshops and classroom sessions where JEKO members grow together as future educators.',
      cover: 'https://readdy.ai/api/search-image?query=Editorial%20photograph%20of%20a%20bright%20modern%20university%20seminar%20room%20in%20Malaysia%20with%20young%20student%20teachers%20in%20smart%20casual%20clothing%20collaborating%20and%20smiling%20during%20a%20physical%20education%20workshop%2C%20warm%20off-white%20natural%20light%2C%20premium%20institutional%20documentary%20photography%2C%20high%20detail&width=1200&height=900&seq=jeko-album-class&orientation=landscape'
    },
    {
      index: '02',
      title: 'SPORTS & ACTIVITIES',
      description: 'Training days, matches, athletics meets and every drop of sweat that builds our club.',
      cover: 'https://readdy.ai/api/search-image?query=Dynamic%20editorial%20sports%20photograph%20of%20young%20Malaysian%20student%20athletes%20competing%20on%20an%20outdoor%20track%20and%20field%20arena%2C%20navy%20and%20maroon%20sports%20kits%2C%20motion%20blur%20energy%2C%20golden%20late%20afternoon%20light%2C%20premium%20athletic%20organization%20photography%2C%20high%20detail&width=1200&height=900&seq=jeko-album-sports&orientation=landscape'
    },
    {
      index: '03',
      title: 'ACHIEVEMENTS',
      description: 'Medals, trophies and milestones that celebrate the dedication of every JEKO member.',
      cover: 'https://readdy.ai/api/search-image?query=Editorial%20photograph%20of%20a%20university%20sports%20team%20proudly%20holding%20a%20championship%20trophy%20and%20medals%20on%20a%20simple%20off-white%20stage%2C%20navy%20and%20maroon%20accents%2C%20celebratory%20calm%20expressions%2C%20soft%20studio%20lighting%2C%20premium%20award%20ceremony%20photography%2C%20high%20detail&width=1200&height=900&seq=jeko-album-achievement&orientation=landscape'
    },
    {
      index: '04',
      title: 'RANDOM MOMENTS',
      description: 'The candid in-between frames \u2014 laughter, friendships and the memory of belonging.',
      cover: 'https://readdy.ai/api/search-image?query=Candid%20lifestyle%20photograph%20of%20young%20Malaysian%20university%20sports%20club%20members%20laughing%20together%20on%20campus%20steps%20after%20training%2C%20casual%20sporty%20outfits%2C%20warm%20off-white%20daylight%2C%20authentic%20friendships%2C%20premium%20editorial%20documentary%20photography%2C%20high%20detail&width=1200&height=900&seq=jeko-album-random&orientation=landscape'
    }
  ];

  /* ---------------- nav ---------------- */
  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var navToggleIcon = document.getElementById('navToggleIcon');
  var mobilePanel = document.getElementById('mobilePanel');

  function onScroll() {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function closeMenu() {
    mobilePanel.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    navToggleIcon.className = 'ri-menu-4-line';
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    var open = !mobilePanel.classList.contains('open');
    if (open) {
      mobilePanel.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close menu');
      navToggleIcon.className = 'ri-close-line';
      document.body.style.overflow = 'hidden';
    } else {
      closeMenu();
    }
  });

  mobilePanel.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---------------- reveal on scroll ---------------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setupReveal(root) {
    var nodes = (root || document).querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var node = entry.target;
        var delay = node.getAttribute('data-delay');
        if (delay) node.style.transitionDelay = delay + 'ms';
        node.classList.add('is-visible');
        observer.unobserve(node);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    nodes.forEach(function (node) { observer.observe(node); });
  }

  /* ---------------- glance stats + count up ---------------- */
  var glanceGrid = document.getElementById('glanceGrid');
  glanceStats.forEach(function (stat) {
    var item = el('div', 'glance-item');
    var value = el('span', 'glance-value', stat.value > 0 ? '0' : stat.suffix);
    value.setAttribute('data-end', String(stat.value));
    value.setAttribute('data-suffix', stat.suffix);
    item.appendChild(value);
    item.appendChild(el('p', 'glance-label', stat.label));
    glanceGrid.appendChild(item);
  });

  function runCountUp(node) {
    var end = parseInt(node.getAttribute('data-end'), 10) || 0;
    var suffix = node.getAttribute('data-suffix') || '';
    if (reduceMotion || end <= 0) { node.textContent = end > 0 ? end + suffix : suffix; return; }
    var start = performance.now();
    var duration = 1600;
    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(eased * end) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && !reduceMotion) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCountUp(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    glanceGrid.querySelectorAll('.glance-value').forEach(function (node) { countObserver.observe(node); });
  } else {
    glanceGrid.querySelectorAll('.glance-value').forEach(runCountUp);
  }

  /* ---------------- advisors ---------------- */
  var advisorFeatured = document.getElementById('advisorFeatured');
  var advisorGrid = document.getElementById('advisorGrid');
  var featured = advisors[0];

  var featuredCard = el('article', 'advisor-featured');
  var featuredMedia = el('div', 'advisor-featured-media');
  featuredMedia.appendChild(img(featured.image, featured.name));
  featuredMedia.appendChild(el('span', 'advisor-badge', 'Lead Advisor'));
  var featuredBody = el('div', 'advisor-featured-body');
  featuredBody.appendChild(el('p', 'eyebrow advisor-role', featured.role));
  featuredBody.appendChild(el('h3', 'advisor-name', featured.name));
  featuredBody.appendChild(el('p', 'advisor-desc', featured.description));
  featuredCard.appendChild(featuredMedia);
  featuredCard.appendChild(featuredBody);
  advisorFeatured.appendChild(featuredCard);

  advisors.slice(1).forEach(function (advisor, index) {
    var wrap = el('div', 'reveal');
    wrap.setAttribute('data-delay', String((index % 5) * 60));
    var card = el('article', 'advisor-card');
    var media = el('div', 'advisor-card-media');
    media.appendChild(img(advisor.image, advisor.name));
    media.appendChild(el('div', 'advisor-card-shade'));
    var caption = el('div', 'advisor-card-caption');
    caption.appendChild(el('p', 'advisor-card-role', advisor.role));
    caption.appendChild(el('h3', 'advisor-card-name', advisor.name));
    media.appendChild(caption);
    card.appendChild(media);
    wrap.appendChild(card);
    advisorGrid.appendChild(wrap);
  });

  /* ---------------- org chart ---------------- */
  var orgRoot = document.getElementById('orgChart');

  function leaderCard(person, accent) {
    var card = el('div', 'leader-card' + (accent ? ' leader-card--accent' : ''));
    var photo = el('span', 'leader-card-photo');
    photo.appendChild(img(person.image, person.name));
    card.appendChild(photo);
    var text = el('span', 'leader-card-text');
    text.appendChild(el('span', 'leader-card-role', person.role));
    text.appendChild(el('span', 'leader-card-name', person.name));
    card.appendChild(text);
    return card;
  }

  orgRoot.appendChild(leaderCard(orgChart.chairperson, true));
  orgRoot.appendChild(el('span', 'org-connector'));
  orgRoot.appendChild(leaderCard(orgChart.viceChairperson, false));
  orgRoot.appendChild(el('span', 'org-connector'));

  var adminGrid = el('div', 'org-admin-grid');
  orgChart.administration.forEach(function (person) {
    var outer = el('div', 'org-admin');
    var inner = el('div', 'org-admin-inner');
    var photo = el('span', 'org-admin-photo');
    photo.appendChild(img(person.image, person.name));
    inner.appendChild(photo);
    inner.appendChild(el('p', 'org-admin-role', person.role));
    inner.appendChild(el('p', 'org-admin-name', person.name));
    outer.appendChild(inner);
    adminGrid.appendChild(outer);
  });
  orgRoot.appendChild(adminGrid);

  var divider = el('div', 'org-divider');
  divider.appendChild(el('span', null, ''));
  divider.appendChild(el('span', 'eyebrow', 'Committees'));
  divider.appendChild(el('span', null, ''));
  orgRoot.appendChild(divider);

  var committeeGrid = el('div', 'committee-grid');
  orgChart.committees.forEach(function (committee) {
    var card = el('div', 'committee-card');
    card.appendChild(el('h4', 'eyebrow', committee.name));
    var list = el('div', 'committee-members');
    committee.members.forEach(function (member) {
      var row = el('div', 'committee-member');
      var photo = el('span', 'committee-photo');
      photo.appendChild(img(member.image, member.name));
      row.appendChild(photo);
      row.appendChild(el('span', 'committee-name', member.name));
      list.appendChild(row);
    });
    card.appendChild(list);
    committeeGrid.appendChild(card);
  });
  orgRoot.appendChild(committeeGrid);

  /* ---------------- members ---------------- */
  var memberFilters = document.getElementById('memberFilters');
  var memberGrid = document.getElementById('memberGrid');
  var memberEmpty = document.getElementById('memberEmpty');
  var memberSearch = document.getElementById('memberSearch');
  var activeCategory = 'All';

  memberCategories.forEach(function (category) {
    var chip = el('button', 'filter-chip' + (category === 'All' ? ' active' : ''), category);
    chip.type = 'button';
    chip.addEventListener('click', function () {
      activeCategory = category;
      memberFilters.querySelectorAll('.filter-chip').forEach(function (node) {
        node.classList.toggle('active', node === chip);
      });
      renderMembers();
    });
    memberFilters.appendChild(chip);
  });

  function renderMembers() {
    var q = (memberSearch.value || '').trim().toLowerCase();
    var filtered = members.filter(function (member) {
      var matchesCategory = activeCategory === 'All' || member.category === activeCategory;
      var matchesQuery = q.length === 0 ||
        member.name.toLowerCase().indexOf(q) !== -1 ||
        member.no.indexOf(q) !== -1;
      return matchesCategory && matchesQuery;
    });

    memberGrid.innerHTML = '';
    filtered.forEach(function (member) {
      var card = el('article', 'member-card');
      var media = el('div', 'member-card-media');
      media.appendChild(img(member.image, member.name));
      media.appendChild(el('span', 'member-number', member.no));
      media.appendChild(el('div', 'member-shade'));
      var caption = el('div', 'member-caption');
      caption.appendChild(el('p', 'member-category', member.category));
      caption.appendChild(el('h3', 'member-name', member.name));
      media.appendChild(caption);
      card.appendChild(media);
      memberGrid.appendChild(card);
    });

    memberEmpty.hidden = filtered.length !== 0;
  }

  memberSearch.addEventListener('input', renderMembers);
  renderMembers();

  /* ---------------- gallery ---------------- */
  var galleryGrid = document.getElementById('galleryGrid');
  var modal = document.getElementById('albumModal');
  var modalBackdrop = document.getElementById('modalBackdrop');
  var modalClose = document.getElementById('modalClose');
  var modalImage = document.getElementById('modalImage');
  var modalIndex = document.getElementById('modalIndex');
  var modalTitle = document.getElementById('modalTitle');
  var modalDesc = document.getElementById('modalDesc');

  galleryAlbums.forEach(function (album, index) {
    var wrap = el('div', 'reveal');
    wrap.setAttribute('data-delay', String((index % 2) * 80));
    var card = el('button', 'album-card');
    card.type = 'button';
    card.appendChild(img(album.cover, album.title));
    card.appendChild(el('div', 'album-shade'));
    var body = el('div', 'album-body');
    body.appendChild(el('span', 'album-index', album.index));
    body.appendChild(el('h3', 'album-title', album.title));
    body.appendChild(el('p', 'album-desc', album.description));
    var open = el('span', 'album-open');
    open.appendChild(document.createTextNode('Open album'));
    var arrow = el('i', 'ri-arrow-right-line');
    open.appendChild(arrow);
    body.appendChild(open);
    card.appendChild(body);
    card.addEventListener('click', function () { openAlbum(album); });
    wrap.appendChild(card);
    galleryGrid.appendChild(wrap);
  });

  function openAlbum(album) {
    modalImage.src = album.cover;
    modalImage.alt = album.title;
    modalIndex.textContent = album.index;
    modalTitle.textContent = album.title;
    modalDesc.textContent = album.description;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeAlbum() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeAlbum);
  modalBackdrop.addEventListener('click', closeAlbum);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.hidden) closeAlbum();
  });

  /* ---------------- join form ---------------- */
  var FORM_ENDPOINT = 'https://readdy.ai/api/form/dalkhsguus3pn58u9ckg';
  var form = document.getElementById('join-jeko-form');
  var formError = document.getElementById('formError');
  var formErrorText = document.getElementById('formErrorText');
  var joinSubmit = document.getElementById('joinSubmit');
  var joinSubmitText = document.getElementById('joinSubmitText');
  var joinSubmitIcon = document.getElementById('joinSubmitIcon');
  var joinSuccess = document.getElementById('joinSuccess');
  var joinAgain = document.getElementById('joinAgain');

  function showError(message) {
    formErrorText.textContent = message;
    formError.hidden = false;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var data = new FormData(form);
    var honeypot = String(data.get('website_alt') || '').trim();
    if (honeypot) {
      formError.hidden = true;
      form.hidden = true;
      joinSuccess.hidden = false;
      form.reset();
      return;
    }
    data.delete('website_alt');

    formError.hidden = true;
    joinSubmit.disabled = true;
    joinSubmitText.textContent = 'Submitting...';
    joinSubmitIcon.style.display = 'none';

    var body = new URLSearchParams();
    data.forEach(function (value, key) { body.append(key, value); });

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    })
      .then(function (response) {
        return response.text().then(function (responseText) {
          var parsed = null;
          try { parsed = JSON.parse(responseText); } catch (err) { parsed = null; }
          var meta = parsed && parsed.meta ? parsed.meta : null;
          var serverMessage =
            (meta && meta.message) ||
            (parsed && parsed.message) ||
            (meta && meta.detail) ||
            responseText;

          if (response.ok && parsed && parsed.code === 'OK') {
            formError.hidden = true;
            form.hidden = true;
            joinSuccess.hidden = false;
            form.reset();
          } else {
            showError(serverMessage || 'Something went wrong. Please try again.');
          }
        });
      })
      .catch(function () {
        showError('We could not reach the server. Please check your connection and try again.');
      })
      .then(function () {
        joinSubmit.disabled = false;
        joinSubmitText.textContent = 'Submit Application';
        joinSubmitIcon.style.display = '';
      });
  });

  joinAgain.addEventListener('click', function () {
    joinSuccess.hidden = true;
    form.hidden = false;
    formError.hidden = true;
    form.reset();
  });

  /* ---------------- boot reveals ---------------- */
  setupReveal(document);
})();