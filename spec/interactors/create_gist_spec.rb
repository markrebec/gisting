require 'rails_helper'

RSpec.describe CreateGist, type: :interactor do
  describe '.call' do
    let(:user) { create(:user) }

    context 'with valid arguments' do
      subject {
        described_class.call(
          description: 'foo bar baz',
          privacy: :unlisted,
          user: user,
          blobs: [{filename: 'foobar.rb', body: 'foo bar baz'}]
        )
      }

      it 'succeeds' do
        expect(subject.success?).to be_truthy
      end

      it 'creates a gist with the provided arguments' do
        expect(Gist).to receive(:new).with(
          description: 'foo bar baz',
          privacy: :unlisted,
          user: user,
          blobs_attributes: [{filename: 'foobar.rb', body: 'foo bar baz'}]
        ).and_call_original

        subject
      end

      it 'persists the gist' do
        expect(subject.gist.persisted?).to be_truthy
      end
    end

    context 'without a user' do
      subject {
        described_class.call(
          description: 'foo bar baz',
          privacy: :unlisted,
          blobs: [{filename: 'foobar.rb', body: 'foo bar baz'}]
        )
      }

      it 'fails' do
        expect(subject.success?).to be_falsey
      end
    end

    context 'without at least one blob' do
      subject {
        described_class.call(
          description: 'foo bar baz',
          privacy: :unlisted,
          user: user
        )
      }

      it 'fails' do
        expect(subject.success?).to be_falsey
      end
    end
  end
end
