require 'rails_helper'

RSpec.describe UpdateGist, type: :interactor do
  describe '.call' do
    let(:gist) { create(:gist) }

    context 'without a gist' do
      subject { described_class.call }

      it 'fails' do
        expect(subject).to be_a_failure
      end
    end

    context 'with a gist' do
      subject { described_class.call(gist: gist) }

      it 'succeeds' do
        expect(subject).to be_a_success
      end
    end

    context 'with a gist_id' do
      subject { described_class.call(gist_id: gist.id) }

      it 'succeeds' do
        expect(subject).to be_a_success
      end

      it 'adds the gist to the context' do
        expect(subject.gist).to eq(gist)
      end
    end

    context 'with a description' do
      subject { described_class.call(gist: gist, description: 'This is a test description') }

      it 'updates the description' do
        expect { subject }.to change { gist.reload.description }.to('This is a test description')
      end
    end

    context 'without a description' do
      subject { described_class.call(gist: gist) }

      it 'does not update the description' do
        expect { subject }.to_not change { gist.reload.description }
      end
    end

    context 'with a privacy attribute' do
      subject { described_class.call(gist: gist, privacy: :unlisted) }

      it 'updates the privacy' do
        expect { subject }.to change { gist.reload.privacy }.to('unlisted')
      end
    end

    context 'without a privacy attribute' do
      subject { described_class.call(gist: gist) }

      it 'does not update the privacy' do
        expect { subject }.to_not change { gist.reload.privacy }
      end
    end

    context 'without any blobs' do
      subject { described_class.call(gist: gist) }
    end

    context 'with a new blob' do
      subject { described_class.call(gist: gist, blobs: [{filename: 'new.rb', body: 'This is a new blob'}]) }

      it 'creates a new blob' do
        expect { subject }.to change { gist.reload.blobs.length }.to(1)
      end
    end

    context 'with an existing blob' do
      let(:blob) { create(:blob, gist: gist) }
      subject { described_class.call(gist: gist.reload, blobs: [{id: blob.id, filename: 'changed.rb', body: 'This is an updated blob'}]) }

      it 'updates the existing blob' do
        expect { subject }.to change { blob.reload.filename }.to('changed.rb').and change { blob.reload.body }.to('This is an updated blob')
      end
    end
  end
end
